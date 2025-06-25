
-- Tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'professional', 'receptionist', 'responsible')),
  specialty TEXT,
  professional_license TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de pacientes
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  cpf TEXT UNIQUE,
  rg TEXT,
  address TEXT,
  phone TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  medical_history TEXT,
  allergies TEXT,
  medications TEXT,
  responsible_id UUID REFERENCES public.profiles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de especialidades/terapias
CREATE TABLE public.specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  session_duration INTEGER DEFAULT 60, -- em minutos
  default_price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de salas
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER DEFAULT 1,
  equipment TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de agendamentos
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  professional_id UUID NOT NULL REFERENCES public.profiles(id),
  specialty_id UUID NOT NULL REFERENCES public.specialties(id),
  room_id UUID REFERENCES public.rooms(id),
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  price DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de prontuários
CREATE TABLE public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  appointment_id UUID REFERENCES public.appointments(id),
  professional_id UUID NOT NULL REFERENCES public.profiles(id),
  specialty_id UUID NOT NULL REFERENCES public.specialties(id),
  session_date DATE NOT NULL,
  session_notes TEXT NOT NULL,
  evolution TEXT,
  goals TEXT,
  next_session_plan TEXT,
  attachments TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de documentos
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id),
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  description TEXT,
  is_shared_with_parents BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela financeira - contas
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('receivable', 'payable', 'revenue', 'expense')),
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE,
  payment_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  patient_id UUID REFERENCES public.patients(id),
  category TEXT,
  payment_method TEXT,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de horas trabalhadas
CREATE TABLE public.work_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.profiles(id),
  appointment_id UUID REFERENCES public.appointments(id),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  hours_worked DECIMAL(4,2) NOT NULL,
  hourly_rate DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de eventos educacionais
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('course', 'workshop', 'lecture', 'seminar')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  max_participants INTEGER,
  price DECIMAL(10,2) DEFAULT 0,
  instructor_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  certificate_template TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de inscrições em eventos
CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id),
  participant_name TEXT NOT NULL,
  participant_email TEXT NOT NULL,
  participant_phone TEXT,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  attendance_status TEXT DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'present', 'absent')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  certificate_issued BOOLEAN DEFAULT false
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (usuários podem ver seus próprios dados)
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas para pacientes (responsáveis podem ver seus pacientes)
CREATE POLICY "Responsible can view their patients" ON public.patients FOR SELECT USING (responsible_id = auth.uid());
CREATE POLICY "Professionals can view all patients" ON public.patients FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'professional', 'receptionist')));

-- Políticas para agendamentos
CREATE POLICY "Users can view related appointments" ON public.appointments FOR SELECT USING (
  professional_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.patients WHERE id = patient_id AND responsible_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'receptionist'))
);

-- Políticas para prontuários
CREATE POLICY "Professionals can view medical records" ON public.medical_records FOR SELECT USING (
  professional_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Políticas para documentos
CREATE POLICY "Users can view related documents" ON public.documents FOR SELECT USING (
  uploaded_by = auth.uid() OR
  EXISTS (SELECT 1 FROM public.patients WHERE id = patient_id AND responsible_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'professional'))
);

-- Políticas básicas para outras tabelas (admin/professional access)
CREATE POLICY "Admin and professional access" ON public.specialties FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'professional')));
CREATE POLICY "Admin and professional access" ON public.rooms FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'professional')));
CREATE POLICY "Admin access" ON public.accounts FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Professional own work hours" ON public.work_hours FOR ALL USING (professional_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "All can view events" ON public.events FOR SELECT TO authenticated USING (true);
CREATE POLICY "All can view registrations" ON public.event_registrations FOR SELECT TO authenticated USING (true);

-- Inserir dados de exemplo
INSERT INTO public.specialties (name, description, session_duration, default_price) VALUES
('Psicologia', 'Atendimento psicológico especializado', 60, 150.00),
('Nutrição', 'Orientação nutricional e dietética', 45, 120.00),
('Musicoterapia', 'Terapia através da música', 60, 130.00),
('Psicopedagogia', 'Apoio pedagógico especializado', 60, 140.00),
('Assistência Social', 'Suporte social e familiar', 60, 100.00);

INSERT INTO public.rooms (name, description, capacity) VALUES
('Sala 1', 'Sala para atendimento individual', 2),
('Sala 2', 'Sala para atendimento individual', 2),
('Sala de Música', 'Sala equipada para musicoterapia', 3),
('Sala de Grupo', 'Sala para atendimentos em grupo', 8);
