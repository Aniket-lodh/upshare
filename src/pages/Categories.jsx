const Categories = ({user}) => {
    return (
        <div className=" h-5/6 px-4 py-4 flex items-center justify-center flex-col">
            <h2 className="font-bold text-color-font-primary text-xl capitalize"> No categories Item Exists yet!☹️</h2>
            <p className="text-center text-sm text-color-font-secondary mt-0.5 mb-2">Tap the create one button to add a new category?</p>
            <button type="button" title="add-category"
                    className="font-semibold tracking-wide text-color-font-primary capitalize px-4 bg-white py-3 rounded-md border border-color-border-primary drop-shadow-sm hover:bg-color-shades-accent"
                    onClick={() => alert("Congratulations you have made it to categories section!🐛")}>
                Create one
            </button>
        </div>
    )
}
export default Categories;