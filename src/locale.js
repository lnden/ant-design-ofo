import React from 'react';
import { connect } from 'dva';
import { ConfigProvider } from 'antd';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { ANT_LANGPACKAGE, LANGPACKAGE } from './locales';

const Locale = ({ i18n, children }) => {
    return (
        <ConfigProvider locale={ANT_LANGPACKAGE[i18n]}>
            <IntlProvider locale={i18n} messages={LANGPACKAGE[i18n]}>
                {children}
            </IntlProvider>
        </ConfigProvider>
    );
};

export default connect(({ app }) => ({
    i18n: app.get('i18n'),
}))(Locale);
