import { PathItemObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { OpenAPIObject } from '@nestjs/swagger';

// Customize the OpenAPI document before serving
export const patchDocumentOnRequest = (req, res, doc: OpenAPIObject) => {
  // Modify the document as needed

  const path: PathItemObject = {
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
  // Add or modify other properties as needed
  return doc;
};
