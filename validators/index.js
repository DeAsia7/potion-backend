import { z } from 'zod';

// Importing individual validators

//login schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
//poison schema
export const poisonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ingredients: z.string().min(1, "Ingredient is required"),
  effect: z.string().min(1, "Effects are required"),
  created_at: z.date().optional(),
});
//potion schema 
export const potionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ingredients: z.string().min(1, "Ingredient is required"),
  effect: z.string().min(1, "Effects are required"),
});



//middleware needs to be explained better
//error handling. fix try and catch. 
