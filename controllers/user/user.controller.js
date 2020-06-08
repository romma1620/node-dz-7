const {userService} = require('../../service')
const {hashPassword, checkHashPassword} = require('../../helpers')
const {ErrorHandler} = require('../../errors')

module.exports = {
    getAllUsers: async (req, res) => {
        let users = await userService.getUsers();
        res.json(users)
    },

    getUser: async (req, res) => {
        let users = await userService.getUser(req.params.id);
        res.json(users)
    },

    updateUser: async (req, res) => {
        try {
            await userService.updateUser(req.body.id, req.body);
        } catch (e) {
            res.json(e)
        }
        res.end()
    },

    deleteUser: async (req, res) => {
        try {
            await userService.deleteUser(req.params.id);
        } catch (e) {
            res.json(e)
        }

        res.sendStatus(204)
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;

            user.password = await hashPassword(user.password)

            await userService.createUser(user);

        } catch (e) {
            res.json(e)
        }

        res.end()
    },

    loginUser: async (req, res, next) => {

            const {email, password} = req.body;

            const user = await userService.getUserByParams({email})

            if (!user) {
               return next(new ErrorHandler('User not found', 404, 4041))
            }

            await checkHashPassword(user.password, password)

            res.json(user)


    }

};
