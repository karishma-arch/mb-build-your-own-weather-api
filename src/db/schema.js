import {integer,serial,timestamp,pgTable,varchar,text} from "drizzle-orm/pg-core"

export const usersTable = pgTable("users",{
id:integer().primaryKey().generatedAlwaysAsIdentity(),
name:varchar({length:255}).notNull(),
password:text('password').notNull(),
email:varchar({length:255}).notNull().unique(),
accountType:varchar({length:50}),
country:varchar({length:100}),
countryCode:varchar({length:10}),
state:varchar({length:100}),
phone_number:varchar({length:30}),
occupation:varchar({length:255}),
address:text(),
dateofBirth:varchar({length:50})
})


export const passwordResetTable = pgTable("password_reset",{
    id:serial("id").primaryKey(),

    userId:integer("user_id").notNull().references(()=>usersTable.id),

    otp:varchar("otp",{length:6}).notNull(),

    expiresAt:timestamp("expires_at").notNull()

})


export const locationTable = pgTable("location_Table",{
id:serial({length:255}),
userId:integer("user_id").notNull().references(()=>usersTable.id),
location:text("location").notNull(),
title:varchar("title",{length:255}).notNull(),
createdAt:timestamp("created_at")
.defaultNow().$default.notNull()
}

)