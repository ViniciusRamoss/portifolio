export interface Contact<L extends string> {
  label: L
  display: string
  href: string
}

export const contacts: {
  email: Contact<'email'>
  phone: Contact<'phone'>
  linkedin: Contact<'linkedin'>
  github: Contact<'github'>
} = {
  email: {
    label: 'email',
    display: 'viniciussilvaramos1@gmail.com',
    href: 'mailto:viniciussilvaramos1@gmail.com',
  },
  phone: {
    label: 'phone',
    display: '+55 11 9 6150-7151',
    href: 'tel:+5511961507151',
  },
  linkedin: {
    label: 'linkedin',
    display: 'linkedin.com/in/vinicius-silva-ramos-7a5139164',
    href: 'https://www.linkedin.com/in/vinicius-silva-ramos-7a5139164/',
  },
  github: {
    label: 'github',
    display: 'github.com/ViniciusRamoss',
    href: 'https://github.com/ViniciusRamoss',
  },
}
