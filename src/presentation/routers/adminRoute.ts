import { Router } from "express"
import { AdminController } from "../controllers/adminController"
import { Routes } from "../../shared/constants/routes"

export default function setupAdminRoutes(adminController: AdminController): Router{
    const router = Router()

    router.get(Routes.ADMIN.USERS, adminController.fetchUsers)
    router.get(Routes.ADMIN.NEIGHBORS, adminController.fetchNeighbors)
    router.get(Routes.ADMIN.TASKS, adminController.fetchTasks) 
    router.patch(Routes.ADMIN.NEIGHBOR_VERIFY, adminController.verifyNeighbor)
    router.patch(Routes.ADMIN.USER_BAN, adminController.banUser)
    router.patch(Routes.ADMIN.NEIGHBOR_BAN,adminController.banNeighbor)

    

    // router.get('/transaction_details',adminController.fetch_transactions)
    
    

    return router
}
