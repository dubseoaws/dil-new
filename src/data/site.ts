import home from './home.json'
import assetMap from './assets.json'

export const assets: Record<string, string> = assetMap
export const imageFor = (text: string) => {
  const image = home.images.find(image => image.alt.includes(text))
  return image ? { ...image, src: assets[image.src] || image.src } : { src: '/images/hero.jpg', alt: text }
}
export const dentists = [
  ['Dr. Sam Parsno', 'Implant Dentist', '72207'],
  ['Dr. Yasha Y Shirazi', 'Principal Dentist and Clinical Director', '195843'],
  ['Dr Kamran Yazdi', 'Dentist', '197926'],
  ['Dr. Andreia Phipps', 'Dentist', '229601'],
  ['Dr. Reza Davari', 'Dentist', '302422'],
  ['Dr. Narges Ameri', 'Dentist', '325081'],
  ['Jack Button', 'Dental Hygienist', '244367'],
  ['Laila Alhussein', 'Dental Hygienist', '328882'],
]
// Verbatim Google reviews as published on the source site's South Kensington page.
export const reviews = [
  { name: 'Carlos Rosa', initials: 'CR', text: 'By far, the best dental procedure I have received. Will definitely continue using their services. Clean place, welcoming reception staff. Doctor is nice and strightforward as well as clear and concise. Could not ask more. Keep up the good job' },
  { name: 'K D', initials: 'KD', text: 'great treatment with Dr Andreia. Had composite bondings done and can honestly highly recommend it. It perfectly blends in with my natural shade and no one can tell I have had something done. Thank you for giving my confidence back!!' },
  { name: 'Camryn Owen', initials: 'CO', text: 'Beyond pleased with this lovely dental clinic. They fitted me in last minute and were so accommodating. Everyone is so lovely and friendly with 10/10 services. Can’t recommend enough!' },
]
export const faqs = [
  ['What Are Dental Implants?', 'A dental implant is a titanium screw placed directly into the jawbone. Over time, it fuses with the bone and functions as an artificial tooth root to support crowns, bridges, or dentures.'],
  ['Why are Dental Implants Needed?', 'They provide a long-term solution for missing teeth, helping to prevent bone loss, restore chewing function, and improve aesthetics compared to traditional dentures.'],
  ['Are dental Implants safe?', 'Yes, dental implants are a well-established, proven treatment. We use biocompatible titanium implants that integrate safely with your body.'],
  ['Are dental implants painful?', "The procedure is performed under local anesthesia, so you shouldn't feel pain during surgery. Post-operative discomfort is usually manageable with over-the-counter medication."],
  ['How long do dental implants last?', 'With proper care and oral hygiene, dental implants are designed for long-term use. Studies show success rates of over 95% at 10 years. Individual results depend on oral health, lifestyle, and maintenance.'],
]
