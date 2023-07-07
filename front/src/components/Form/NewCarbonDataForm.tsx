import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "./NewCarbonDataForm.module.css";
import { NewCarbonDataFormProps } from "../../interface/NewCarbonDataFormProps";
import GetAllCategories from "../../services/getAllCategories";


const NewCarbonDataForm = ({ setName, setCategory, setPrice, setCo2, handleFormSubmit }: NewCarbonDataFormProps) => {
	const [categories, setCategories] = useState<any>();
	const { getAllCategories } = GetAllCategories()

	useEffect(() => {
		getAllCategories().then(data => {
			setCategories(data.data.getAllCategories);
		});
	}, [])

	const handleInputChange =
		(setStateFunc: React.Dispatch<React.SetStateAction<string | undefined>>) =>
			(event: ChangeEvent<HTMLInputElement>): void => {
				setStateFunc(event.target.value);
			};

	const handleInputNumberChange =
		(setStateFunc: React.Dispatch<React.SetStateAction<number | undefined>>) =>
			(event: ChangeEvent<HTMLInputElement>): void => {
				setStateFunc(Number(event.target.value));
			};

	const handleSelectChange =
		(setStateFunc: React.Dispatch<React.SetStateAction<number | undefined>>) =>
			(event: ChangeEvent<HTMLSelectElement>): void => {
				setStateFunc(Number(event.target.value));
			};

	return (
		<>
			<div className={styles.MainContainer}>
				<div className={styles.modalContainer}>
					<h1 className={styles.modalTitle}>Ajouter une dépense carbone</h1>
					<div className={styles.formContainer}>
						<div>
							<p className={styles.formTitle}>Quel est le nom de votre dépense ?</p>
							<input
								className={styles.formInputLogin}
								type="text"
								name="carbonName"
								id="carbonName"
								placeholder="Ex: Train TGV Nantes - Bordeaux"
								required
								onChange={handleInputChange(setName)}
							/>
						</div>
						<div>
							<p className={styles.formTitle}>Catégorie de la dépense</p>
							<select
								className={styles.formInputLogin}
								name="category"
								id="category"
								placeholder="Catégorie"
								onChange={handleSelectChange(setCategory)}
								required
							>
								<option disabled selected>Sélectionner une catégorie</option>
								{categories && categories.map((category: any, index: string) => {
									return (
										<option key={index} value={category.categoryId}>{category.title}</option>
									)
								})}
							</select>
						</div>
						<div>
							<p className={styles.formTitle}>Prix</p>
							<input
								className={styles.formInputLogin}
								type="number"
								name="price"
								id="price"
								onChange={handleInputNumberChange(setPrice)}
								placeholder="0"
								required
							/>
						</div>
						<div>
							<p className={styles.formTitle}>Poid carbon en kg Co2 ?</p>
							<input
								className={styles.formInputLogin}
								type="number"
								name="co2"
								id="co2"
								onChange={handleInputNumberChange(setCo2)}
								placeholder="0"
								required
							/>
						</div>
						<div className={styles.formGroupSubmit}>
							<button
								onClick={handleFormSubmit}
								className={styles.submitButton}
							>
								Valider
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewCarbonDataForm;