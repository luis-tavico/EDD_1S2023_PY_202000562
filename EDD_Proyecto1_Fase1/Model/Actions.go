package Model

type Actions struct {
	Date string
	Hour string
}

// Methods GET
func (actions *Actions) GetDate() string {
	return actions.Date
}

func (actions *Actions) GetHour() string {
	return actions.Hour
}

// Methods SET
func (actions *Actions) SetDate(date string) {
	actions.Date = date
}

func (actions *Actions) SetHour(hour string) {
	actions.Hour = hour
}
