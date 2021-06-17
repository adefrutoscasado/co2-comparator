import React, { useState, useEffect } from 'react'
import { Slider, InputNumber, Checkbox } from 'antd'
import { BarChartOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

export const formatDecimal = (num = 0, decimals = 2, removeZeroDecimals = true) => {
    const fixed = Number(num).toFixed(decimals)
    // @ts-ignore
    if ((fixed - Math.floor(fixed) === 0) && removeZeroDecimals) return Math.floor(fixed)
    else return fixed
}


const IntegerStep = ({
    name = 'name',
    defaultValue = 1,
    defaultChecked = false,
    min = 1,
    max = 500,
    onChange = (arg: {key: string, value: number}) => {},
    onChangeCheck = (arg: {key: string, checked: boolean}) => {},
    onChangeAmount = (arg: {key: string, value: number, label: string}) => {},
    onSetFixedAmount = (fixedAmount: any) => {},
    amountPerStep = 1,
    amountUnits = 'kgCO2eq',
    stepUnit = '',
    fixedAmount = 0
}) => {
    const [ inputValue, setInputValue ] = useState(defaultValue)
    const [ checked, setChecked ] = useState(defaultChecked)
    const [ focused, setFocused ] = useState(false)

    useEffect(() => {
        if (fixedAmount) {
            const inputValue = fixedAmount / amountPerStep
            setInputValue(inputValue)
        }
    }, [fixedAmount])

    useEffect(() => {
        onChangeCheck({key: name, checked: checked})
    }, [checked])

    const onChangeValue = (value: number) => {
        setInputValue(value);
    }

    useEffect(() => {
        onChange({key: name, value: inputValue})
    }, [inputValue])

    const amount = (typeof amountPerStep === 'function') ?
        // @ts-ignore
        amountPerStep(inputValue)
        :
        amountPerStep * inputValue

    const label = `${formatDecimal(inputValue)} ${stepUnit} of ${name}`

    useEffect(() => {
        onChangeAmount({key: name, value: amount, label})
    }, [])

    useEffect(() => {
        onChange({key: name, value: inputValue})
        onChangeAmount({key: name, value: amount, label})
    }, [inputValue])
    
    return (
        <div className='integer-step'>
            <div className='flex-direction-row'>
                <div className='checkbox'>
                    <Checkbox
                        onChange={() => {
                            setChecked(checked => !checked);
                        }}
                        checked={checked}
                    >
                    </Checkbox>
                </div>
                <div className='label'>
                    <div className='flex-direction-row space-between'>
                        <div>
                            <h4 onClick={() => {
                                onSetFixedAmount(amount)
                            }}>
                                {name}
                            </h4>
                        </div>
                        <div className='flex-direction-row space-between'>
                            <div>
                                <h4>
                                    {formatDecimal(amount)} {amountUnits}
                                </h4>
                            </div>
                            <div 
                                className='check-equivalences-icon'
                                title="Check equivalences"
                            >
                                <BarChartOutlined
                                    style={{ fontSize: '16px', color: '#1890ff' }}
                                    onClick={() => {
                                        onSetFixedAmount(amount)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-direction-row space-between'>
                <div className='slider'>
                    <Slider
                        min={min}
                        max={max}
                        onChange={onChangeValue}
                        onAfterChange={() => onChangeAmount({key: name, value: amount, label})}
                        value={typeof inputValue === "number" ? inputValue : 0}
                    />
                </div>
                <div className='input-number'>
                    <InputNumber
                        min={min}
                        max={max}
                        value={inputValue}
                        onChange={onChangeValue}
                        onFocus={() => {
                            setFocused(true)
                            // REVIEW: suming triggers a change to format again 
                            setInputValue(inputValue+0.00000000000001)
                        }}
                        onBlur={() => {
                            setFocused(false)
                            // REVIEW: suming triggers a change to format again 
                            setInputValue(inputValue+0.00000000000001)
                        }}
                        formatter={
                            focused ? 
                                value => `${formatDecimal(value)}` 
                                : 
                                value => `${formatDecimal(value)} ${stepUnit}`
                            }
                    />
                </div>
            </div>
        </div>
    );
}

export default IntegerStep