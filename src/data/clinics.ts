export const clinics = [
  {
    name: 'South Kensington Clinic',
    path: '/south-kensington',
    address: '20 Old Brompton Road, South Kensington, London SW7 3DL',
    phone: '020 7183 3573',
    hours: [['Monday', '9 AM to 6 PM'], ['Tuesday', '9 AM to 8 PM'], ['Wednesday', '9 AM to 6 PM'], ['Thursday', '9 AM to 8 PM'], ['Friday', '8 AM to 5 PM'], ['Saturday', '10 AM to 4 PM'], ['Sunday', '10 AM to 4 PM']],
    opening: [[10, 16], [9, 18], [9, 20], [9, 18], [9, 20], [8, 17], [10, 16]] as ([number, number] | null)[],
  },
  {
    name: 'City of London Clinic',
    path: '/city-of-london',
    address: '5 Ave Maria Lane, London EC4M 7AQ',
    phone: '020 7183 0573',
    hours: [['Monday to Thursday', '8:00am to 6:00pm'], ['Friday', '8:00am to 2:00pm']],
    opening: [null, [8, 18], [8, 18], [8, 18], [8, 18], [8, 14], null] as ([number, number] | null)[],
  },
]