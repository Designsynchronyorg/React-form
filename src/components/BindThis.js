import React from 'react';

export const BindThis = (self, methods) => {
    return methods.map((method) => (
        self[method] = self[method].bind(self)
    ));
}
