const { request, response } = require("express");
const { crearRecibo } = require("../../helpers/createFile");
const Orden = require("../../models/ordenes/Orden");

const insertOrden = async (req = request, res = response) => {
    try {
        const rootID = req.body.paciente._id;
        let orden = new Orden({
            ...req.body,
            fecha_pedido: new Date(),
        });
        const aux = await Orden.findOne({}, 'folio').sort({ folio: -1 });
        orden.folio = ((aux && aux.folio) || 0) + 1;
        const file = await crearRecibo(orden, rootID);
        orden.files = [...orden.files, { ...file }];
        orden = await orden.save();
        return res.json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const fetchDefault = async (req = request, res = response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const ordenes = await Orden.find({
            fecha_pedido: {
                $gte: today,
            }
        });
        res.json({ ok: true, ordenes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

module.exports = {
    insertOrden,
    fetchDefault,
}