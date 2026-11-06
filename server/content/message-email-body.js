export async function messageEmailBody(form) {
  return `
Namn: ${form.name}
E-post: ${form.email}
Företag: ${form.company}
Telefon: ${form.phone}
Stad: ${form.city}
Sida: ${form.pageuri}
Sidnamn: ${form.pagename}
Ämne: ${form.subject}
Meddelande: ${form.message.replace(/\\r\\n/g, "\n")}
`;
}
