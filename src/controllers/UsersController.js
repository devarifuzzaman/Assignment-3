import UsersModel from "../model/UsersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import EmailSend from "../utility/emailUtility.js";


export const Registration = async(req,res)=>{
	try {
		let reqBody = req.body;
		await UsersModel.create(reqBody)
		return res.json({status:"success",message:"User Registration Successfully"})
	}catch(err){
		return res.json({status:"error",message:err.toString()})
	}

}


export const Login = async(req,res)=>{
	try{
		let reqBody = req.body;
		let data = await UsersModel.findOne(reqBody)
		if(data===null){
			return res.json({status:"error",message:"User does not exist"})
		}else {
			//Login Success Token Encode
			let token = TokenEncode(data['email'],data['_id'])
			let cookieOption = { expires:new Date(Date.now()+24*6060*1000),httpOnly:false}

			res.cookie('token',token,cookieOption) // Set cookie for token

			return res.json({status:"success",Token:token, message:"User Login Successfully"})
		}

	}catch(err){
		return res.json({status:"error",message:err.toString()})
	}
}

export const LogOut = async (req, res) => {
	let cookieOption = { expires: new Date(Date.now()-24*6060*1000), httpOnly: false}
	res.cookie('token',"", cookieOption)
	return res.json({status:"success",message:"User Logged Out Successfully"})
}

export const ProfileDetails = async(req,res)=>{
	try{
		let user_id =req.headers['user_id'];
		let data = await UsersModel.findOne({"_id":user_id});
		return res.json({status:"success",message:"User Profile Details Showing Successfully", data:data})
	}catch(err){
		return res.json({status:"error",message:err.toString()})
	}
}

export const AllProfileDetails = async(req,res)=>{
	try{
		let data = await UsersModel.find({},{password:0,otp:0});
		return res.json({status:"success",message:"All User Profile Details Showing Successfully", data:data});
	}catch(err){
		return res.json({status:"error",message:err.toString()}) 
	}
}

export const UpdateProfile = async(req,res)=>{
	try {
		let reqBody = req.body;
		let user_id = req.headers['user_id'];
		let data = await UsersModel.updateOne({"_id":user_id},reqBody);

		//update the user and clear the Token and make the user Logout
		let cookieOption = { expires: new Date(Date.now()-24*6060*1000), httpOnly: false}
		res.cookie('token',"", cookieOption)

		return res.json({status:"success",message:"Profile Updated Successfully",data:data});
	}catch(err){
		return res.json({status:"error",message:err.toString()})
	} 
}


export const DeleteUser = async(req,res)=>{
	try {
		let user_id = req.headers['user_id'];
		await UsersModel.deleteOne({"_id":user_id})

		//Delete the user and clear the Token and make the user Logout
		let cookieOption = { expires: new Date(Date.now()-24*6060*1000), httpOnly: false}
		res.cookie('token',"", cookieOption)

		return res.json({status:"success",message:"Profile Deleted Successfully"})
	}catch(err){
		return res.json({status:"error",message:err.toString()})
	} 
}




export const EmailVerification = async(req,res)=>{
	try{
		let email = req.params.email;
		let data = await UsersModel.findOne({email: email});
		if(data===null){
			return res.json({status:"error",message:"User Email Not Found"})
		}else {
			let code = Math.floor(100000+Math.random()*900000);
			let EmailTo = data['email'];
			let EmailText = "Your Code is " + code;
			let EmailSubject = "Task Manager Verification Code";
			await EmailSend(EmailTo,EmailText,EmailSubject);
			await UsersModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})
			return res.json({status:"success",message:"Verification Code Send Successfully, Check your Email"})
		}
	}catch(err){
		return res.json({status:"error",message:err.toString()})
	}
}

export const CodeVerification = async(req,res)=>{
	try{
		let email = req.params.email;
		let code = req.params.code;

		let data = await UsersModel.findOne({email: email,otp: code})
		if(data===null){
			return res.json({status:"error",message:"Wrong Verification Code"})
		}else {
			return res.json({status:"success",message:"Verification Code Successfully"})
		}
	}catch(err){
		return res.json({status:"error",message:err.toString()})
	}
}


export const ResetPassword = async(req,res)=>{
	try{
		let reqBody = req.body;
		let data = await UsersModel.findOne({email: reqBody['email'],otp:reqBody['code']});
		if (data===null){
			return res.json({status:"error",message:"Wrong Verification Code"})
		}else {
			await UsersModel.updateOne({email: reqBody['email']}, {otp: "0", password: reqBody['password']});
			return res.json({status:"success",message:"User Password Reset Successfully"})
		}
	}catch(err){
		return res.json({status:"error",message:err.toString()})
	}
}


