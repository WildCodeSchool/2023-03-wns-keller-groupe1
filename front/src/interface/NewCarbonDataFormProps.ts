export interface NewCarbonDataFormProps {
    setName: React.Dispatch<React.SetStateAction<string|undefined>>;
    setCategory: React.Dispatch<React.SetStateAction<number|undefined>>;
    setPrice: React.Dispatch<React.SetStateAction<number|undefined>>;
    setCo2: React.Dispatch<React.SetStateAction<number|undefined>>;
    handleFormSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}