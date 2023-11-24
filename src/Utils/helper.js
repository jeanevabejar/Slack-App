

export const formatTimestamp = (timestamp) => {
    const options = { year: 'numeric', day: '2-digit', month: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = new Date(timestamp).toLocaleString('en-US', options);
    return formattedDate;
  };
  
  

export const extractUsername = (email) => {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    }
   
    return email;
  };
  
 
  
  