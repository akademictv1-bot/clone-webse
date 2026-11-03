import { Accommodation, AccommodationImage, Amenity, Host, Settings } from "./types";

export const initialHost: Host = {
  id: "host-1",
  name: "António Enclave",
  photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
  bio: "Com mais de 10 anos de experiência no sector de hospitalidade em Moçambique e Zimbabwe, garanto que sua estadia nas acomodações da Enclave será sempre sinônimo de conforto, tranquilidade e acolhimento verdadeiro."
};

export const initialSettings: Settings = {
  id: "settings-1",
  company_name: "Enclave Accommodation",
  whatsapp_number: "+26377735000",
  email: "enclaveccommodation@gmail.com",
  about_text: "A Enclave Accommodation nasceu da paixão por transformar estadias em experiências memoráveis. Com sede estratégica em Chimoio e expansão para Mutare e Nyanga, oferecemos mais do que um quarto; entregamos um santuário curado, pautado na sofisticação, no minimalismo estético e no profissionalismo absoluto."
};

export const initialAccommodations: Accommodation[] = [
  {
    id: "acc-1",
    name: "Residência Vale dos Sonhos",
    city: "Chimoio",
    country: "Moçambique",
    description: "Uma casa espaçosa numa zona residencial calma e tranquila de Chimoio, com quintal privativo e muito sossego. Ideal para famílias ou grupos que procuram descansar em paz, com quartos confortáveis, luz natural e boa ventilação. Tem Wi-Fi na casa — em Chimoio, a conexão é modesta.",
    price_per_night: 8500,
    bedrooms: 4,
    beds: 6,
    bathrooms: 3.5,
    max_guests: 8,
    google_maps_link: "https://maps.google.com/?q=Chimoio",
    whatsapp_number: "+26377735000"
  },
  {
    id: "acc-2",
    name: "Enclave Chimoio Trangapasso",
    city: "Chimoio",
    country: "Moçambique",
    description: "Um lugar bonito e acolhedor no bairro Trangapasso, numa zona calma e tranquila de Chimoio, perto do aeroporto, com pouco trânsito e muito sossego. Oferece quartos confortáveis, suítes privativas, ampla sala de estar e áreas ao ar livre para descanso.",
    price_per_night: 8500,
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    max_guests: 6,
    google_maps_link: "https://maps.google.com/?q=Chimoio+Central",
    whatsapp_number: "+26377735000"
  },
  {
    id: "acc-3",
    name: "Nyanga Peak Lodge",
    city: "Nyanga",
    country: "Zimbabwe",
    description: "Aninhado nos picos enevoados de Nyanga, este lodge de basalto escuro redefine a harmonia com a natureza. Com vistas deslumbrantes para o vale dos pinheiros e lareira central aconchegante, é o santuário perfeito para casais ou entusiastas de montanha.",
    price_per_night: 12000,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    max_guests: 4,
    google_maps_link: "https://maps.google.com/?q=Nyanga+Peak",
    whatsapp_number: "+258841112222"
  },
  {
    id: "acc-4",
    name: "Mutare Executive Suite",
    city: "Mutare",
    country: "Zimbabwe",
    description: "O conforto contemporâneo com texturas inspiradas no design africano, num ambiente tranquilo em Mutare. Oferece Wi-Fi Starlink de alta velocidade, interiores em tons areia e atenção personalizada da nossa equipa — tudo num espaço calmo e bem cuidado.",
    price_per_night: 6200,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    max_guests: 2,
    google_maps_link: "https://maps.app.goo.gl/he8ov61kw6DJKbz37",
    whatsapp_number: "+258842223333"
  }
];

export const initialImages: AccommodationImage[] = [
  // Residência Vale dos Sonhos
  {
    id: "img-1-1",
    accommodation_id: "acc-1",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "img-1-2",
    accommodation_id: "acc-1",
    image_url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "img-1-3",
    accommodation_id: "acc-1",
    image_url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "img-1-4",
    accommodation_id: "acc-1",
    image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85"
  },

  // Enclave Chimoio Trangapasso
  {
    id: "img-2-1",
    accommodation_id: "acc-2",
    image_url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "img-2-2",
    accommodation_id: "acc-2",
    image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
  },

  // Nyanga Peak Lodge
  {
    id: "img-3-1",
    accommodation_id: "acc-3",
    image_url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "img-3-2",
    accommodation_id: "acc-3",
    image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85"
  },

  // Mutare Executive Suite
  {
    id: "img-4-1",
    accommodation_id: "acc-4",
    image_url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "img-4-2",
    accommodation_id: "acc-4",
    image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85"
  }
];

export const initialAmenities: Amenity[] = [
  // Residência Vale dos Sonhos
  { id: "am-1-1", accommodation_id: "acc-1", amenity_name: "Wi-Fi na Casa" },
  { id: "am-1-2", accommodation_id: "acc-1", amenity_name: "Estacionamento Grátis" },
  { id: "am-1-3", accommodation_id: "acc-1", amenity_name: "Cozinha Equipada" },
  { id: "am-1-4", accommodation_id: "acc-1", amenity_name: "Água Quente" },
  { id: "am-1-6", accommodation_id: "acc-1", amenity_name: "Quintal Privado" },
  { id: "am-1-7", accommodation_id: "acc-1", amenity_name: "Zona Calma & Tranquila" },
  { id: "am-1-8", accommodation_id: "acc-1", amenity_name: "Máquina de Lavar" },

  // Enclave Chimoio Trangapasso
  { id: "am-2-1", accommodation_id: "acc-2", amenity_name: "Zona Calma & Tranquila" },
  { id: "am-2-2", accommodation_id: "acc-2", amenity_name: "Ar Condicionado" },
  { id: "am-2-3", accommodation_id: "acc-2", amenity_name: "Áreas Externas" },
  { id: "am-2-4", accommodation_id: "acc-2", amenity_name: "Estacionamento Privado" },

  // Nyanga Peak Lodge
  { id: "am-3-1", accommodation_id: "acc-3", amenity_name: "Lareira a Lenha" },
  { id: "am-3-2", accommodation_id: "acc-3", amenity_name: "Vista de Montanha" },
  { id: "am-3-3", accommodation_id: "acc-3", amenity_name: "Água Quente" },
  { id: "am-3-4", accommodation_id: "acc-3", amenity_name: "Estacionamento Grátis" },

  // Mutare Executive Suite
  { id: "am-4-1", accommodation_id: "acc-4", amenity_name: "Wi-Fi Starlink" },
  { id: "am-4-2", accommodation_id: "acc-4", amenity_name: "Serviço de Quarto" },
  { id: "am-4-3", accommodation_id: "acc-4", amenity_name: "Cozinha Equipada" },
  { id: "am-4-4", accommodation_id: "acc-4", amenity_name: "Smart TV" }
];
