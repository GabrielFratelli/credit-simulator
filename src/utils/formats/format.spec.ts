import * as format from './format'

describe('format', () => {
  describe('formatCurrencyBRL', () => {
    it('deve formatar o valor para BRL', () => {
      expect(format.formatCurrencyBRL(1000)).toBe('R$ 1.000,00')
      expect(format.formatCurrencyBRL(0)).toBe('R$ 0,00')
      expect(format.formatCurrencyBRL(1234.56)).toBe('R$ 1.234,56')
    })

    it('deve chamar Intl.NumberFormat', () => {
      const spy = jest.spyOn(Intl, 'NumberFormat')
      format.formatCurrencyBRL(50)
      expect(spy).toHaveBeenCalledWith('pt-BR', { style: 'currency', currency: 'BRL' })
      spy.mockRestore()
    })
  })

  describe('formatNumber', () => {
    it('deve formatar o número com 2 casas decimais por padrão', () => {
      expect(format.formatNumber(123.456)).toBe(123.46)
      expect(format.formatNumber(0)).toBe(0)
    })

    it('deve formatar o número com casas decimais customizadas', () => {
      expect(format.formatNumber(123.456, 1)).toBe(123.5)
      expect(format.formatNumber(123.456, 0)).toBe(123)
    })

    it('deve chamar Number.prototype.toFixed', () => {
      const spy = jest.spyOn(Number.prototype, 'toFixed')
      format.formatNumber(42.987, 1)
      expect(spy).toHaveBeenCalledWith(1)
      spy.mockRestore()
    })
  })
})