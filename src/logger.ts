import fs from "fs"

const loggerWriter = (text:string)=>{
	const currentDate = new Date()
	const logMessage = `[${currentDate}] ${text}\n`


	fs.writeFile("/datelogs/loggerjs.txt",logMessage,{flag:"a"},(err:any)=>{
		if(err){
			console.log(err)
}	
	})
}
export default loggerWriter
