const express =require("express") ///app.listen--- port,,,app.get
const bodyParser =require("body-parser") ///app.post
const request =require("request")


const app= express();

/// to send ou static files like images and style.css file we will use

app.use(express.static("public")); ///forward those files into a public page
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req, res){

    const firstName= req.body.fname; ///fname, lname, email, egula html e attribute dhore call dewa
    const lastName= req.body.lname;
    const email= req.body.email;
    const https=require("https");

    const data= {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    
    const jsonData= JSON.stringify(data);

    const url ="https://us21.api.mailchimp.com/3.0/lists/4dba20d3ae";

    const options={
        method: "POST",
        auth: "fuad:0ca95927efec9a4caf88dcbfd5f79117-us21"

    }
 
    const request= https.request(url, options, function(response){

        if (response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
            } else{
                res.sendFile(__dirname+"/fail.html");
            }
        
        response.on ("data",function(data){
        console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);
    request.end();


}); 


 app.post("/failure", function(req,res){
    res.redirect("/")
 })










app.listen(3000, function(){
    console.log("Server is running on: localhost:3000")
})

// api key    0ca95927efec9a4caf88dcbfd5f79117-us21

// list id 4dba20d3ae

