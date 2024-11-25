import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UpdateReserveInterface {
	id: string;
	location: string;
	campus: string;
	paymentType: string;
	amount: number;
}

interface Store {
	updateReserve: UpdateReserveInterface;
	setUpdateReserve: (updateData: Partial<UpdateReserveInterface>) => void;
	clearReserve: () => void;
}

const initialState: UpdateReserveInterface = {
	id: "",
	location: "",
	campus: "",
	paymentType: "",
	amount: 0,
};

export const updateReserveStore = create<Store>()(
	persist(
		(set) => ({
			updateReserve: initialState,

			setUpdateReserve: (updateData) =>
				set((state) => {
					// Shallow comparison to prevent unnecessary updates
					const shouldUpdate = Object.keys(updateData).some(
						(key) =>
							state.updateReserve[key as keyof UpdateReserveInterface] !==
							updateData[key as keyof UpdateReserveInterface]
					);

					return shouldUpdate
						? { updateReserve: { ...state.updateReserve, ...updateData } }
						: state;
				}),

			clearReserve: () => set({ updateReserve: initialState }),
		}),
		{
			name: "reserve-info-storage",
		}
	)
);
