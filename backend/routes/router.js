import express from "express"
import checkRegexp from "../../public/regexp.js";
import User from "../user.js"
import bcrypt from "bcryptjs"; 

let quoteid = 1;
const router = express.Router();

let CheckRegexp = checkRegexp.CheckRegexp;

// Middlewares
let checkUser = (req,res,next) =>{
    let {username,email,password} = req.body;
    let check = new CheckRegexp(email,username,password);
    if(check.checkEmail() && check.checkUsername() && check.checkPassword()){
        next();
    }
    else{
        res.json({
            message:"ვალიდაცია ჩავარდა",
        })
    }
}


router.post("/signup",checkUser, async (req, res) => {
    
    let {username,email,password} = req.body;
    try {
        const saltRounds = 10;

        const existingUser = await User.findOne({username:username});
        
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(password,saltRounds);

            const newUser = new User({
                username:username,
                email:email,
                password:hashedPassword,
            })

            await newUser.save();

            req.session.user = { 
                 id: newUser._id,
                 username: newUser.username
            };

            res.json({
                message:"ვალიდაცია ყველა მონაცემმა გაიარა",
                username:username,
            })
        }
        else{
            res.json({message:`მომხმარებელი უკვე არსებობს`});
        }
    } catch (error) {
        console.log(error.message);
    }
        
})

router.post("/login", async (req,res) =>{
    let {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email:email});
        
        if(!existingUser){
            // უსაფრთხოების მიზნით, მივაწოდოთ ზოგადი შეცდომა
            return res.json("შეამოწმე პაროლი ან ემაილი");
        }
        
        // **მნიშვნელოვანია:** bcrypt.compare არის ასინქრონული
        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        
        if(passwordMatch){
            // 🔑 აქ ვინახავთ მომხმარებლის მონაცემებს სესიაში!
            req.session.user = { 
                id: existingUser._id,
                username: existingUser.username
            };

            res.json({
                message:"ვალიდაცია ყველა მონაცემმა გაიარა",
                username:existingUser.username,
            })
        }
        else{
            // არასწორი პაროლი
            res.json("შეამოწმე პაროლი ან ემაილი");
        }
    
    } catch (error) {
        console.log(error.message);
    }
})


// check authentication when page is refreshed 
router.get("/check-auth", (req, res) => {
    // ეს მარშრუტი გამოიყენება ფრონტენდის მიერ გვერდის ჩატვირთვისას (refresh)
    
    if (req.session && req.session.user) {
        // თუ სესია არსებობს და მასში მომხმარებელია შენახული
        res.json({ 
            isLoggedIn: true, 
            username: req.session.user.username 
        });
    } else {
        // თუ სესია არ არის ან ვადა გაუვიდა
        res.json({ isLoggedIn: false });
    }
});


// logout
router.post("/logout", (req, res) => {
    // req.session.user - თუ ეს ობიექტი არსებობს, ვანადგურებთ სესიას
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                // თუ სესიის განადგურებისას მოხდა შეცდომა
                return res.status(500).json({ message: "სესიის განადგურების შეცდომა" });
            }
            // სესიის წარმატებით განადგურება
            res.json({ message: "წარმატებით გამოხვედით სისტემიდან" });
        });
    } else {
        // თუ მომხმარებელი ისედაც არ არის დალოგინებული
        res.json({ message: "თქვენ უკვე გამოსული ხართ სისტემიდან" });
    }
});

export default router;