import { Router } from "express"
import { AdminController } from "../controllers/adminController"

export default function setupAdminRoutes(adminController: AdminController): Router{
    const router = Router()

    router.get('/users', adminController.fetchUsers)
    router.get('/neighbors', adminController.fetchNeighbors)
    router.get('/tasks', adminController.fetchTasks) 
    router.patch('/neighbors/:id/verify', adminController.verifyNeighbor)
    router.patch('/users/:id/ban', adminController.banUser)
    router.patch('/neighbor/:id/ban',adminController.banNeighbor)

    

    // router.get('/transaction_details',adminController.fetch_transactions)
    
    

    return router
}
