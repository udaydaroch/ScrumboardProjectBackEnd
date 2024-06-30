import Ajv from 'ajv';
const ajv = new Ajv({removeAdditional:'all', strict: false});

ajv.addFormat("email", {type: "string", validate: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
});
const validate = async (schema: object, data: any) => {
    try {
        const validator = ajv.compile(schema);
        const valid = await validator(data);
        if(!valid) {
            return ajv.errorsText(validator.errors);
        }
        return true;
    } catch (err) {
        return err.message;
    }
}

export{validate}