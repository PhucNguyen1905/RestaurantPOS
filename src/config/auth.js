exports.isAdmin = function (req, res, next) {
    if (req.isAuthenticated() && res.locals.user.role_id == 1) {
        next();
    } else {
        if (res.locals.user) {
            req.logout();
        }
        res.redirect('/admin/login');
    }
}
exports.isCashier = function (req, res, next) {
    if (req.isAuthenticated() && (res.locals.user.role_id == 2 || res.locals.user.role_id == 3)) {
        next();
    } else {
        if (res.locals.user) {
            req.logout();
        }
        res.redirect('/cashier/login');
    }
}

exports.isUser = function (req, res, next) {
    if (req.isAuthenticated() && res.locals.user.role_id == 5) {
        next();
    } else {
        if (res.locals.user) {
            req.logout();
        }
        res.redirect('/login');
    }
}