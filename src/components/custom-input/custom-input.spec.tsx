import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Colors from '../../theme/theme.colors'
import CustomInput from './custom-input.component'

import '@testing-library/jest-dom';

describe('Custom Input', () => {
    it('should render with error if hasError is true', () => {
        const { getByPlaceholderText } = render(
            <CustomInput placeholder="Lorem Ipsum" hasError={true} />
        )

        const input = getByPlaceholderText('Lorem Ipsum')

        expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` })
    })

    it('should render without error if hasError is false', () => {
        const { getByPlaceholderText } = render(
            <CustomInput placeholder="Lorem Ipsum" hasError={false} />
        )

        const input = getByPlaceholderText('Lorem Ipsum')

        expect(input).toHaveStyle({ border: 'none' })
    })

    it('should change value when user types', async () => {
        const { getByPlaceholderText } = render(
            <CustomInput placeholder="Lorem Ipsum" hasError={false} />
        )

        const input = getByPlaceholderText('Lorem Ipsum')

        userEvent.type(input, 'Lorem Ipsum')

        // Espera pelo input ter o valor esperado antes de prosseguir
        await waitFor(() => {
            expect(input).toHaveValue('Lorem Ipsum');
        });
    })
})