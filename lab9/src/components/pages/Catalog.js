import styles from "./Catalog.module.css"
import { useContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import ParkingContext from "../contexts/ParkingContextProvider";
import Button from "../basic/Button";
import Loader from "../basic/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../data/reducers";

export default function Catalog(props) {
    const navigate = useNavigate();
    const path = useLocation();
    const context = useContext(ParkingContext);

    function addNewitem() {
        let title = document.getElementsByClassName(styles.title)[0].value;
        let description = document.getElementsByClassName(styles.description)[0].value;
        let slots = parseInt(document.getElementsByClassName(styles.slots)[0].value);

        context.addItem({title, description, slots})
    }

    function searchItems() {
        let searchString = document.getElementsByClassName(styles.searchbar)[0].value;
        context.setFilters({ searchString: searchString });
    }

    function filterItems() {
        let minSlots = parseInt(document.getElementsByClassName(styles.minimal_slots)[0].value);
        context.setFilters({ minSlots: parseInt(minSlots) });
    }

    function goto(localPath) {
        navigate(`${path.pathname.replace(/\/[^/]*$/, "")}${localPath}`)
    }

    let catalogItems = context.items;

    let slotSum = 0
    for(const catalogItem of catalogItems) {
        slotSum += catalogItem.slots;
    }

    return (
                <div className={styles.catalog}>
                    <div className={styles.catalog_filters}>
                    <h2>See what's available</h2>
                            <Button className={styles.setting_add_button} onClick={() => goto("/add")}>
                                Add
                            </Button>
                            <Button className={styles.setting_filter_button}  onClick={() => goto("/filter")}>
                                Filter
                            </Button>
                            <Button className={styles.setting_exit_button} onClick={() => navigate(".")}>
                                Exit
                            </Button>
                        <Routes>    
                            <Route path="/filter" element={
                                <div>
                                    <br/>
                                    <Button onClick={() => context.setFilteredItems(context.items.sort((a, b) => a.slots - b.slots))}>
                                        Sort by number of slots
                                    </Button>
                                    
                                    <h6>Search for:</h6>
                                    <input className={styles.searchbar} type="text" minLength="1" required />
                                    <br/>
                                    <br/>
                                    <Button onClick={searchItems}>
                                        Search
                                    </Button>
                                    <br/>
                                    <h6>FIlter items with slots no less than:</h6>
                                    <input className={styles.minimal_slots} type="number" minLength="1" required />
                                    <br/>
                                    <br/>
                                    <Button onClick={filterItems}>
                                        Filter
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Button id="hero_data-field-cancel-filter" onClick={() => context.setFilters(null)}>
                                        Remove filters
                                    </Button>
                                    <h6>Total amount of slots: {slotSum}</h6>
                                </div>
                            }/>
                            <Route path="/add" element={
                                <div>
                                    <h2>Add new parking facility</h2>                

                                    <h6>Title</h6>
                                    <input className={styles.title} type="text" minLength="1" required/>

                                    <h6>Description</h6>
                                    <textarea className={styles.description} type="text" minLength="1" required></textarea>

                                    <h6>Number of parking slots</h6>
                                    <input className={styles.slots} type="number" minLength="1" min="0" required/>
                                    <br/>
                                    <br/>
                                    <Button className={styles.add_button} onClick={(e) => { e.preventDefault(); addNewitem();}}>
                                        Add
                                    </Button>

                                </div>
                            }/>
                        </Routes>
                    </div>
                    {catalogItems.length > 0 ? 
                    <div className={styles.catalog_list}>
                        {catalogItems.map(parking => <CatalogItem key={parking.id} element={parking}/>)} 
                    </div>
                        : 
                    <div style={{margin: "auto"}}>
                        <Loader/>
                    </div>
                    }
                </div>
    );
}

function CatalogItem(props) {
    const context = useContext(ParkingContext);
    const navigate = useNavigate();
    const cart = useSelector((state) => state.items.cart)
    const dispatch = useDispatch();

    return (
        <div className={styles.element}>
            <div className={styles.element_image}/>
            <div className={styles.element_text}>
                <h2>{props.element.title}</h2>
                {props.element.description}
                <h6>slots: {props.element.slots}</h6>     
            </div>
            <div className={styles.element_buttons}>
                <Button className={styles.remove_button} onClick={(e) => { e.preventDefault(); context.removeItem(props.element.id)}}>
                    Remove
                </Button>
                <Button className={styles.edit_button} onClick={() => { context.setCurrentItem(props.element); navigate(`/item/${props.element.id}`); }}>
                    Details
                </Button>
                <br/><br/>
                {
                    cart.some(item => item.item.id === props.element.id) ?
                    <Button className={styles.remove_cart_button} onClick={() => { dispatch(removeFromCart(props.element)) }}>
                        Remove from cart
                    </Button>
                    :
                    <Button className={styles.cart_button} onClick={() => { dispatch(addToCart(props.element)) }}>
                        Add to cart
                    </Button>
                }
            </div>
        </div>
    );
}