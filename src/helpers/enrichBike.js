const enrichBike = (bike) => {
    const kmSince = bike.currentOdometer - bike.lastOilChangeOdometer;
    const kmLeft = bike.oilChangeIntervalKm - kmSince;
    const pct = Math.min(100, Math.round((kmSince / bike.oilChangeIntervalKm) * 100));

    const status = kmLeft <= 0 ? "overdue" : kmLeft <= 500 ? "warning" : "good";

    const statusClass = {
        good: "text-green-400 border-green-800 bg-green-900/30",
        warning: "text-amber-400 border-amber-800 bg-amber-900/30",
        overdue: "text-red-400 border-red-800 bg-red-900/30",
    }[status];

    const accentColor = {
        good: "#639922",
        warning: "#EF9F27",
        overdue: "#E24B4A",
    }[status];

    const progressHintClass = {
        good: "text-green-400",
        warning: "text-amber-400",
        overdue: "text-red-400",
    }[status];

    const progressHint = kmLeft <= 0
        ? `+${Math.abs(kmLeft).toLocaleString()} km overdue`
        : `${kmLeft.toLocaleString()} km left`;

    return {
        ...bike,
        currentOdometer: bike.currentOdometer.toLocaleString(),
        status,
        statusClass,
        accentColor,
        progressHint,
        progressHintClass,
        progressPct: pct,
    };
}

export default enrichBike;