import * as yup from 'yup';
import { DateTime } from 'luxon';


export const BookYupSchema = yup.object().shape({
    id: yup.mixed().nullable(true).default(null),
    authors: yup.string().ensure().required("Mora se uneti ime autora knjige"),
    title: yup.string().ensure().required("Mora se uneti naziv knjige"),
    genre: yup.string().ensure().required("Mora se uneti zanr knjige"),
    publishDate: yup.date().max(DateTime.now(), "Unesite datum izdavanja knjige"),
    // rating: yup.number().ensure().required("Mora se uneti ocena knjige"),
    // isbn: yup.number().ensure().required("Mora se uneti isbn broj knjige"),
    // available: yup.boolean().ensure().required("Da li je knjiga dostupna true/false"),
    // pages: yup.number().ensure().required("Mora se uneti broj stranica knjige"),
    
});

export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}