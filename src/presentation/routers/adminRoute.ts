import { Router } from "express"
import { AdminController } from "../controllers/adminController"

export default function setupAdminRoutes(adminController: AdminController): Router{
    const router = Router()

    router.get('/userList', adminController.fetchUsers)
    // router.get('/userDetails/:id', adminController.userDetails)
    router.get('/neighborList', adminController.fetchNeighbors)
    router.get('/TaskList', adminController.fetchTasks) 
    router.patch('/verifyNeighbor', adminController.verifyNeighbor)
    
    
    

    return router
}
