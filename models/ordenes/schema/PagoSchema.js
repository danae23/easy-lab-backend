const { Schema } = require("mongoose");

const PagoSchema = Schema({
    pago: {
        type: Number,
        required: true,
    },
    tipo_pago: {
        type: String,
        required: true,
    },
}, { _id: false });

module.exports = PagoSchema;