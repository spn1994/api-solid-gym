import fastify from "fastify";
import { appRoutes } from '@/http/routes'

export const app = fastify()


app.register(appRoutes)

// ORM - Object Relational Mapper

// ORM - Object Relational Mapping (mapear tudo q tem dentro em objetos no DBA)
