import {
    Box,
    debounce,
    List,
    ListItemButton,
    TextField,
    Typography,
    type TextFieldProps,
} from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
    type FieldValues,
    type UseControllerProps,
    useController,
} from "react-hook-form";

type Props<T extends FieldValues> = { label: string } & UseControllerProps<T> &
    TextFieldProps;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || "");

    useEffect(() => {
        if (field.value && typeof field.value === "object") {
            setInputValue(field.value.venue || "");
        } else {
            setInputValue(field.value || "");
        }
    }, [field.value]);

    const handleSelect = (location: LocationIQSuggestion) => {
        const city =
            location.address.city ||
            location.address.town ||
            location.address.village;
        const venue = location.display_name;
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lon);

        setInputValue(venue);
        field.onChange({ venue, city, latitude, longitude });
        setSuggestions([]);
    };

    const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=${
        import.meta.env.VITE_LocationIQ_API_KEY ||
        "pk.b6d8716994d22138ee406c3989a514a1"
    }&limit=5&dedupe=1&`;

    const fetchSuggestions = useMemo(
        () =>
            debounce(async (query: string) => {
                if (query.length < 3) {
                    setSuggestions([]);
                    return;
                }
                try {
                    setLoading(true);
                    const res = await axios.get<LocationIQSuggestion[]>(
                        `${locationUrl}&q=${query}`
                    );
                    const data = res.data;
                    setSuggestions(data);
                } catch (error) {
                    console.error(
                        "🚀 ~ Error fetching location suggestions:",
                        error
                    );
                } finally {
                    setLoading(false);
                }
            }, 500),
        [locationUrl]
    );

    const handleInputChange = async (value: string) => {
        field.onChange(value);
        await fetchSuggestions(value);
    };

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 && (
                <List>
                    {suggestions.map((suggestion) => (
                        <ListItemButton
                            divider
                            onClick={() => handleSelect(suggestion)}
                            key={suggestion.place_id}
                            sx={{ border: 1 }}
                        >
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    );
}
