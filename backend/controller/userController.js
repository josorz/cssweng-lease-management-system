const User = require('../models/Users');
const bcrypt = require('bcrypt');

// POST 
exports.registerUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match!" });
            return;
        }

        // Check if the username already exists using Mongoose
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({ message: "Email is already used!" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user to the database
        const user = new User({
            email,
            password: hashedPassword,
            isActivated: false
        })

        await user.save()

        res.json({ message: "Registration successful" });
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: e.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await User.findOne({ email });

        if (!userLogin) {
            res.status(401).json({ message: "Invalid credentials!" });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, userLogin.password);

        if (passwordMatch) {
            if (!req.session) {
                req.session = {};
            }

            if (req.session.authenticated) {
                req.session.email = email;
                res.status(201).json(req.session);
            } else {
                req.session.authenticated = true;
                req.session.email = email;
                res.status(201).json(req.session);
            }
        } else {
            res.status(401).json({ message: "Invalid credentials!" });
        }

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json('Logout Successful!')
    })
};