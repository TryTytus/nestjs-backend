"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchDocumentOnRequest = void 0;
const patchDocumentOnRequest = (req, res, doc) => {
    const path = {
        post: {
            tags: ['SignIn'],
            operationId: 'signIn',
            description: 'Signin a user with email ID and password',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            example: {
                                formFields: [
                                    {
                                        id: 'email',
                                        value: 'adamtyton1@gmail.com',
                                    },
                                    {
                                        id: 'password',
                                        value: '#Dupa1234',
                                    },
                                ],
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'token',
                },
            },
        },
    };
    doc.paths['/auth/signin'] = path;
    doc.info.description = 'Customized API description';
    return doc;
};
exports.patchDocumentOnRequest = patchDocumentOnRequest;
//# sourceMappingURL=openapi.js.map