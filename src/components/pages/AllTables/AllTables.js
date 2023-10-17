import styles from "./AllTables.module.scss";
import Table from "../../common/Table/Table";
import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";

const AllTables = () => {
	const tables = useSelector(state => getAllTables(state));

	return (
		<article>
			<h2>All Tables</h2>
			<ul className={styles.list}>
				{tables.map(table => <Table key={table.id} id={table.id} status={table.status} />)}
			</ul>
		</article>
	);
};

export default AllTables;