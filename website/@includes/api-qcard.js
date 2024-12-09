var filmurl = "@videos/74464_coco_thai_1901.mp4"; // Byt URL'en mot pekare och lokal filmfil.
var producent = "mattias.sundberg@adinq.se"; // Byt namnet mot rätt producent's mailaddress.
var filmOk = 0; // 0 = Inget valt, 1 = Ok, 2 = Inte Ok
  
var filename = filmurl.split('/').pop().split('#')[0].split('?')[0];
var filmProducent = "mailto: " + producent + "?subject=Kommentarer%20ang%20" + filename;
