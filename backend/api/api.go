package api

import (
	"github.com/gin-gonic/gin"
)

func SetupAPI(r *gin.Engine) {
	v1 := r.Group("/api/")
	InitPost(v1)
	InitUserRouter(v1)
	InitAuthRouter(v1)
}
