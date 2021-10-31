import React, { useState } from "react";
import { CardContent, Tab, Typography } from "@mui/material";
import { Button } from "@mui/material";
import TableDropdown from "./TableDropdown";
import Card from "@mui/material/Card";
import "./BookList.css";



const BookList = ({list, onDelete}) => {
  return (
  <div className = "body">
    
    {list.map((card) => 
    <div className="cardMenu">
      <Card className = "card" key = {card.id}>
         <CardContent>
           <Typography variant = "h5" sx={{textAlign: 'center' }} component="div">
             {card.title}
           </Typography>
           <Typography color="text.secondary" sx={{textAlign: 'center' }}>
             {card.authors}
           </Typography>
           <Typography variant = "body2" sx={{textAlign: 'center' }} >
             Published: {card.publishDate}
           </Typography>
           <div className="bottom">
           <Typography className = "star-button" variant = "body2">
             <div ratingValue={card.rating} size={20}></div>
             <span style={{flexGrow: 1}}/>
           </Typography>
           <Typography>
             <Button size="small"> <TableDropdown text="..."
                  items={
                      [
                        {text: "Pregledaj...", link: true, path: `/book/${card.id}/view`},
                        {text: "Izmeni...", link: true, path: `/book/${card.id}/edit`},
                        {text: "Obrisi", link: false, action: () => onDelete(card.id)}
                      ]
                  }
                  /></Button>
           </Typography>  
           </div>     
         </CardContent>
      </Card>
    </div>
      )} 
      </div>
    );
    
}




export default BookList; 