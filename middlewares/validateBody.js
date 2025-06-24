export default function validateBody(schema) {
    return (req, res, next) => {
  const results = schema.safeParse(req.body);
        if (!results.success) {
            return res.status(400).json({
                error: 'Validation Failed',
                details: results.error.error
           
            })
        }

            req.body = results.data
            next();
        }
    }
     // sends a body post or put. 
     //validating body to check if the info in the frontend is in the right format 