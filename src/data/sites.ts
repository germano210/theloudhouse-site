import carlosTurImage from '../../assets/sites/CarlosTur.png';
import centralImage from '../../assets/sites/CarlosTur-Central.png';
import MonsterImage from '../../assets/sites/LojaMonster.png';
import EriveltoImage from '../../assets/sites/Erivelto.png';

export interface Site {
  id: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  url: string;
  iframe?: {
    enabled?: boolean;
    viewportWidth?: number;
  };
}

// Preencha cada url com o endereço HTTPS aprovado. Vazio = link pendente.
// Os nomes identificam as imagens fornecidas; não indicam publicação.
export const sites: readonly Site[] = [
  {
    id: 'carlos-tur',
    name: 'Carlos Tur',
    category: 'Site',
    image: carlosTurImage,
    imageAlt: 'Prévia do site Carlos Tur, com um ônibus de turismo em destaque.',
    imagePosition: 'center',
    url: 'https://claude.ai/artifact/VDQoDQauYpjG5xmJHAvKHH',
  },
  {
    id: 'carlos-tur-central',
    name: 'Carlos Tur Central',
    category: 'Central',
    image: centralImage,
    imageAlt: 'Prévia da interface Carlos Tur Central em formato de celular.',
    imagePosition: 'top',
    url: 'https://claude.ai/artifact/18eS2B4RAsXq3QhThNJgPF',
    // O endereço do Claude bloqueia incorporação por frame-ancestors.
    iframe: { enabled: false },
  },
  {
  id: 'EastSide64',
  name: 'Site para loja do EastSide64',
  category: 'Loja do LEO',
  image: MonsterImage,
  imageAlt: 'Prévia do Site da Loja do EastSide64.',
  imagePosition: 'center',
  url: 'https://claude.ai/artifact/WRNUicBfw1tDGGPXX4Mxu8',
  },
  {
  id: 'Erivelto',
  name: 'Erivelto Imoveis',
  category: 'Erivelto Imoveis',
  image: EriveltoImage,
  imageAlt: 'Prévia da corretora Erivelto Imoveis.',
  imagePosition: 'center',
  url: 'https://claude.ai/artifact/9U9DQed2jS3wQkrRUtUPBw',
},

];

export function getSiteUrl(site: Site): string | undefined {
  try {
    const url = new URL(site.url);
    return url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}
