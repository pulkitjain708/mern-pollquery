let validateMail=(mail)=>{
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return mail.match(regex)
}

module.exports={
    validateMail
}