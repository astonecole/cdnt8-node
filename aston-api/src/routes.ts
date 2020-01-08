import { UserController } from "./controller/UserController";
import { DefaultController } from "./controller/DefaultController";

export const Routes = [
{
    method: 'post',
    route: '/users/register',
    controller: UserController,
    action: 'register'
},
{
    method: 'post',
    route: '/users/authenticate',
    controller: UserController,
    action: 'authenticate'
},
{
    method: "get",
    route: "/",
    controller: DefaultController,
    action: "hello"
},
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}];