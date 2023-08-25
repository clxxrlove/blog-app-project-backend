import { passport } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '@/repository/user.repository'
import { User } from '@/database/index'
import { asyncWrapper } from '@/common/index'
import { createPassword } from '@/utils/index'

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PUBLIC_KEY
};

const localOptions = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyUser = async (payload, done) => {
    if (payload.password) {
        return await UserRepository.findByPassword({
            email: payload.email, 
            password: createPassword(payload.password) 
        });
    }
    return await UserRepository.findByUserId(payload.userId);
};

const strategyHandler = asyncWrapper(async (payload, done) => {
    const user = await verifyUser(payload);
    try {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
})

passport.use(new LocalStrategy(localOptions, strategyHandler));
passport.use(new JwtStrategy(jwtOptions, strategyHandler));
passport.initialize();