exports.infocovid = (corohelp, tampilTanggal, tampilWaktu) => {
	return `*INFORMASI COVID-19 TERBARU*

⚠️ positif: *${corohelp.confirmed.value}*
⚠️ sembuh: *${corohelp.recovered.value}*
⚠️ meninggal: *${corohelp.deaths.value}*

update: *${corohelp.lastUpdate}*

_TETAP JAGA KESEHATAN DAN SELALU PAKAI MASKER! jan lupa c*** eh maksudnya stay at home :v_
}
