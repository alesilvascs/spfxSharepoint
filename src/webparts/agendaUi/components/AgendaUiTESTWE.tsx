import * as React from 'react';
import {useEffect, useState} from 'react';
import {IAgendaUiProps} from './IAgendaUiProps';
import {sp} from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import FullScreenDialog from "../elements/FullScreenDialog";
import styles from "./AgendaUi.module.scss";




// @ts-ignore
export default function AgendaUiTESTWE(props: IAgendaUiProps) {

    const [res, setRes] = useState( [])

    useEffect(() => {
        sp.setup({
            //spfxContext:  props.context,
            sp:{
                baseUrl:"https://4qvv8t.sharepoint.com/sites/Dados",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"

                    },
            }
        });

        _getListItemsFrom()
        // SalvarReserva()

    }, []);

    const _getListItemsFrom = async ()  => {
        await sp.web.lists
            .getByTitle("Reservas").items.getAll()
            .then(( response: any[]) =>{
                setRes(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
                <section className={`${styles.agendaUi} `}>
                    <div className={styles.welcome}>
                        {/*<h2>Olá, { props.userDisplayName   }!</h2>*/}
                         <div>
                            <FullScreenDialog res={res} userDisplayName={props.userDisplayName}/>
                         </div>
                    </div>

                    {/*{console.log(res)}*/}

            {/*{ res.map((item, i) =>*/}
            {/*    <div>*/}
            {/*        <li key={i}>*/}
            {/*             <span>{item.Title} / </span>*/}
            {/*             <span>{item.DataInicial} /   </span>*/}
            {/*             <span>{item.DataFinal}  </span>*/}
            {/*           </li>*/}
            {/*     </div>*/}
            {/*    )*/}
            {/* }*/}


</section>
 )
}