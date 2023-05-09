const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.render('error/error', {
            statusCode: 401,
            message: 'Your unauthenticated access to this content',
            toDo: 'Please submit right role first'
        });
    }

    try {
        const decoded = jwt.verify(token, 'project');
        //console.log(decoded);
        return next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }

}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'project', async (err, decodedToken) => {
            if (err) {
                res.locals.curUser = null;
                next();
            } else {
                let user = decodedToken;
                res.locals.curUser = user;
                //console.log(res.locals.curUser);
                next();
            }
        });
    } else {
        res.locals.curUser = null;
        //console.log(res.locals.curUser);
        next();
    }
}

const checkDoctor = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'project', async (err, decodedToken) => {
            if (err) {
                res.locals.curUser = null;
                next();
            } else {
                if (decodedToken.role !== 'primedoctor' && decodedToken.role !== 'doctor') {
                    return res.render('error/error', {
                        statusCode: 403,
                        message: 'Unauthorized! Your Access Denied because you are not a doctor',
                        toDo: 'Please submit right role first'
                    });
                }
                next();
            }
        });
    } else {
        res.locals.curUser = null;
        //console.log(res.locals.curUser);
        next();
    }
}

const checkPrimeDoctor = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'project', async (err, decodedToken) => {
            if (err) {
                res.locals.curUser = null;
                next();
            } else {
                if (decodedToken.role !== 'primedoctor') {
                    return res.render('error/error', {
                        statusCode: 403,
                        message: 'Unauthorized! Your Access Denied because you are not a prime doctor',
                        toDo: 'Please submit right role first'
                    });
                }
                next();
            }
        });
    } else {
        res.locals.curUser = null;
        next();
    }
}

const checkNurse = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'project', async (err, decodedToken) => {
            if (err) {
                res.locals.curUser = null;
                next();
            } else {
                if (decodedToken.role !== 'primedoctor' && decodedToken.role !== 'nurse') {
                    return res.render('error/error', {
                        statusCode: 403,
                        message: 'Unauthorized! Your Access Denied because you are not a nurse',
                        toDo: 'Please login first'
                    });
                }
                next();
            }
        });
    } else {
        res.locals.curUser = null;
        //console.log(res.locals.curUser);
        next();
    }
}




module.exports = { verifyToken, checkUser, checkPrimeDoctor, checkDoctor, checkNurse };