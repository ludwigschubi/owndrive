import React from 'react';
import rdf from 'rdflib';
import styles from './NotificationsPage.module.css';
import { Notification } from '../../functional_components/Notification';
import Container from 'react-bootstrap/Container';
const ns = require('solid-namespace')(rdf);

class NotificationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId,
            notifications: undefined,
        };

        this.fetchNotifications = this.fetchNotifications.bind(this);
    }

    fetchNotifications() {
        const webId = this.state.webId;
        const inboxAddress = webId.replace('profile/card#me', 'inbox');

        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);

        return fetcher.load(inboxAddress).then(() => {
            const containments = store
                .each(rdf.sym(inboxAddress), ns.ldp('contains'))
                .map((notification) => {
                    const notificationAddress =
                        inboxAddress +
                        '/' +
                        notification.value.split('/')[3].replace('inbox', '');
                    return fetcher
                        .load(notificationAddress)
                        .then(() => {
                            const notification = store.statementsMatching(
                                rdf.sym(notificationAddress),
                                ns.rdf('type'),
                                ns.solid('Notification')
                            )[0].subject.value;
                            return notification;
                        })
                        .catch((err) => {
                            return undefined;
                        });
                });
            return Promise.all(containments).then((results) => {
                const cleanResults = [];
                results.forEach((result) => {
                    if (result) {
                        cleanResults.push(result);
                    }
                });
                return cleanResults;
            });
        });
    }

    getNotificationContent(notification) {
        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);

        const PREQ = rdf.Namespace('https://a-solid-web.github.io/permission-ontology/permissionrequests.rdf#');

        return fetcher.load(notification).then(() => {
            const sender = store.any(
                rdf.sym(notification),
                PREQ('requestFrom')
            );

            if (!sender) {
                return;
            }

            const requestType = store.any(
                rdf.sym(notification),
                PREQ('requestDataType')
            );
            const requestTypeValue = requestType.value.split('#')[1];

            const requestedRessource = store.any(
                rdf.sym(notification),
                PREQ('requests')
            );
            const requestedRessourceValue = requestedRessource.value;

            const created = store.any(
                rdf.sym(notification),
                PREQ('wasSentOn')
            );
            const createdValue = created ? created.value : '';

            const expires = store.any(
                rdf.sym(notification),
                PREQ('expires')
            );
            const expiresValue = expires ? expires.value : '';

            const requestStatus = store.any(
                rdf.sym(notification),
                PREQ('hasStatus')
            );
            const requestStatusValue = requestStatus ? requestStatus.value : '';

            const privacyRisk = store.any(
                rdf.sym(notification),
                PREQ('privacyRisklevel')
            );
            const privacyRiskValue = privacyRisk
                ? 'There is a ' + privacyRisk.value + ' privacy Risk'
                : '';

            const financialRisk = store.any(
                rdf.sym(notification),
                PREQ('financialRisklevel')
            );
            const financialRiskValue = financialRisk
                ? 'There is a ' + financialRisk.value + 'financial Risk'
                : '';

            const legalRisk = store.any(
                rdf.sym(notification),
                PREQ('legalRisklevel')
            );
            const legalRiskValue = legalRisk
                ? 'There is a ' + legalRisk.value + 'legal Risk'
                : '';

            const requestIntent = store.any(
                rdf.sym(notification),
                PREQ('hasIntent')
            );
            const requestIntentValue = requestIntent
                ? requestIntent.value.split('#')[1]
                : '';

            if (!requestIntentValue) {
                return;
            }

            return {
                sender: sender.value,
                type: requestTypeValue,
                intent: requestIntentValue,
                ressource: requestedRessourceValue,
                created: createdValue,
                expires: expiresValue,
                status: requestStatusValue,
                risks: [privacyRiskValue, financialRiskValue, legalRiskValue],
            };
        });
    }

    componentDidMount() {
        this.fetchNotifications().then((results) => {
            const notifications = results.map((notification) => {
                const notificationContent = this.getNotificationContent(notification).then((content) => {
                    console.log(content);
                });
            });
        });
    }

    render() {
        return (
            <Container className={styles.container}>
                <h3>Notifications</h3>
                <Notification
                    picture="https://ludwigschubert.solid.community/profile/aa.jpeg"
                    actor="ludwigschubert"
                    description="Wants to send you a picture"
                />
            </Container>
        );
    }
}

export default NotificationsPage;
