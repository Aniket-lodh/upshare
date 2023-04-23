const Wishlist = ({user}) => {

    return (
        <section className="w-screen px-4 py-4 relative">
           <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-fit flex flex-col items-center justify-center gap-4">
               <div className="flex flex-col items-center justify-center">
                   <h1 className="font-bold tracking-wide text-xl text-color-font-primary text-center">
                       Wishlist is empty!<br/> Why not add some items?
                   </h1>
                   <p className="mt-2 font-normal text-sm tracking-wide text-color-font-tertiary text-center">
                       Tap heart 💖 button to start saving your favourite items.
                   </p>
               </div>
               <button title="add-to-wishlist-cta" type="button" onClick={() => alert("This feature is coming soon!Hold tight🎉")}
                       className="py-3 px-4 rounded capitalize bg-white drop-shadow-sm border border-color-border-primary font-semibold tracking-wide hover:bg-color-shades-accent">
                   Add Now
               </button>
           </div>
        </section>
    );
}
export default Wishlist;